class FieldRangeHandler:
    @staticmethod
    def evaluate(object_manager, obj, field_info):
        return [0, 1]


class ListArrays:
    @staticmethod
    def available(source, port, location, size, isA):
        if source is None:
            return []

        dataset = source
        if source.IsA("vtkAlgorithm"):
            dataset = source.GetOutput(port)

        if dataset is None:
            return []

        if dataset.IsA("vtkMultiBlockDataSet"):
            return ListArrays.available_multiblock(dataset, port, location, size, isA)

        return ListArrays.available_dataset(dataset, port, location, size, isA)

    @staticmethod
    def available_multiblock(source, port, location, size, isA):
        result = []
        nb_blocks = source.GetNumberOfBlocks()
        for i in range(nb_blocks):
            block = source.GetBlock(i)
            if block is None:
                continue

            if block.IsA("vtkDataSet"):
                result += ListArrays.available_dataset(block, port, location, size, isA)
            elif block.IsA("vtkMultiBlockDataSet"):
                result += ListArrays.available_multiblock(
                    block, port, location, size, isA
                )
            else:
                print(f"Don't know how to handle {block.GetClassName()}")

        return result

    @staticmethod
    def available_dataset(source, port, location, size, isA):
        result = []
        locations = []
        if isinstance(location, str):
            locations.append(location)
        else:
            locations += location

        for loc in locations:
            field_arrays = getattr(source, f"Get{loc}Data")()
            nb_arrays = field_arrays.GetNumberOfArrays()
            for i in range(nb_arrays):
                array = field_arrays.GetAbstractArray(i)
                name = array.GetName()
                nb_comp = array.GetNumberOfComponents()
                keep = True

                # Filter by number_of_components
                if size > 0 and size != nb_comp:
                    keep = False

                # Filter by type
                if len(isA):
                    count = 0
                    for t in isA:
                        if array.IsA(t):
                            count += 1
                    if count == 0:
                        keep = False

                if keep:
                    result.append(
                        {
                            # ui data
                            "text": name,
                            "value": f"{port}::{loc}::{name}",
                            # real data
                            "name": name,
                            "location": loc,
                            "components": nb_comp,
                            "type": array.GetClassName(),
                            "range": array.GetRange(-1)
                            if hasattr(array, "GetRange")
                            else None,
                        }
                    )

        # print("-"*80)
        # print("Array extract dataset...")
        # print("-"*80)
        # print(result)
        # print("-"*80)
        return result


class BoundsExtractor:
    @staticmethod
    def evaluate(obj_algo_ds):
        if obj_algo_ds is None:
            return None

        # print("#"*80)
        # print("# BoundsExtractor")
        # print("#"*80)
        # print(obj_algo_ds.GetClassName())
        # print(dir(obj_algo_ds))
        # print("#"*80)

        ds = obj_algo_ds
        if obj_algo_ds.IsA("vtkAlgorithm"):
            ds = obj_algo_ds.GetOutputDataObject(0)

        if hasattr(ds, "GetBounds"):
            bounds = [-1, -1, -1, -1, -1, -1]
            ds.GetBounds(bounds)
            return bounds

        return None


class BoundsCenter:
    @staticmethod
    def evaluate(bounds):
        if bounds is None:
            return None

        return [
            (bounds[0] + bounds[1]) * 0.5,
            (bounds[2] + bounds[3]) * 0.5,
            (bounds[4] + bounds[5]) * 0.5,
        ]
