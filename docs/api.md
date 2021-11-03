# API

Simput rely on 3 types of managers that build on top of each other and are responsible for handling Proxy, UI and Domains.

- **ProxyManager**:
  - Load proxy definitions
  - Create/Delete proxy
  - Update proxies from a changeset
  - Commit/Reset all modified proxies
  - Find/Get proxy
  - Import/Export state of all created proxy
  - (optionaly) Map proxy state to concrete object

- **UIManager**:
  - Require **ProxyManager** and **UI resolver**
  - Load language/layout definitions
  - Get proxy state for UI
  - Get proxy form for UI (include language + layout)

- **ProxyDomainManager**:
  - Attach to **ProxyManager** for adding behavior to proxy initialization and update.
  - Create a **ProxyDomain** for each newly created proxy.
  - Monitor dirty proxies during an update, so modified domains can be applied in one sweep.
  - Get **ProxyDomain** from proxy id.

## ProxyManager

__Definition handling__

```python
def load_model(self, yaml_file=None, yaml_content=None):
    """Load Data Model from YAML definition"""

def get_definition(self, proxy_type):
    """Return a loaded definition for a given object_type"""

@property
def available_types(self):
    """List all the object_types that have been loaded"""

def types(self, *with_tags):
    """List proxy_types from definition that has the set of provided tags"""
```

__Proxy Management__

```python
def create(self, proxy_type, **initial_values):
    """
    Create a new instance of a proxy using an proxy_type along with
    maybe a set of property values that we want to pre-initialise using the
    **kwargs approach.
    """

def delete(self, proxy_id, trigger_modified=True):
    """
    Delete object along with its dependency that it is owner of
    """

def get(self, proxy_id: str) -> Proxy:
    """
    return proxy instance
    """

def update(self, change_set):
    """
    changeSet = [
        { id: 2143, name: 'Origin', value: [0, 1, 3] },
        ...
    ]
    """
```

__Import / Export__

```python
def save(self, file_output=None):
    """Export state (definition+data) into a file"""

def load(self, file_input=None, file_content=None):
    """Load previously exported state from a file"""
```

__Commit / Reset__

```python
def commit_all(self):
    """Commit all dirty proxies"""

def reset_all(self):
    """Reset all dirty proxies"""
```

__Find / Query Proxy__

```python
def get_instances_of_type(self, proxy_type):
    """
    Return all the instances of the given type
    """

def tags(self, *args):
    """List all instances containing all the listed tags"""
```

### Proxy
### ObjectValue

## UIManager
### UIResolver

## ProxyDomainManager
### ProxyDomain
### PropertyDomain

## Domains
### ProxyBuilder
### IsEqual
### FieldSelector
### Range
### ResetOnChange **
### BoundsCenter
### LabelList

## ObjectValue
### Array