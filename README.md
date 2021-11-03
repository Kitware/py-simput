# PySimput

Python package that let you create web forms using Trame/PyWebVue.
The project include both a Python module along with a generated
Vue based plugin for proxy editing using a fixed set of widgets.

## Introduction

Simput rely on **definitions** to describe the set of **proxies** that it can control.
A **proxy** is a virtual object that gather a set of **properties** which as a whole
represent its **state**. **Proxies** are meant to streamline **state** update and exchange.

A **proxy** can also be used to control a **concrete object** by mapping its state to it.
This is particulary important when a **concreate object** needs to live on a remote location
or inside another thread or service. Having a **proxy** allow us to present and edit its **properties**
in a way that we can easily reconciliate its **state** with its **concrete object** counter part.

When initializing or editing a **property**, we may want to bounds the values to a limited set.
To apply constraints to a **property**, you can define a **domains** section.
A **domain** can be used to compute a reasonable **initial value** once all its dependency have
been resolved or limit a value to be within a set of available ones (list, range).

On top of the data model, Simput aims to provide UI/forms to help user input and update
any user data. And for that we have some UI needs that could be defined to refine how
the information should be display to the user. By default the data model **definition**
is all we need, but if you want to add internationalization, you can provide a **language**
definition to describe **label** and **help** of any **property**. Then if the automatic
property layout is not to your liking, you can create a **layout** definition to manually place
into a grid where each **property** of a given **proxy** should go. Also, you can use that
**layout** to optionally show/hide a subset of properties based on a **domain**.

With definitions for the **data models** with **domains**, **languages** and **ui layouts**,
we think we are empowering developers to create applications with complex user input in no time.
High level definitions files allow developers to describe in a concise manner what they want rather
than how to make their data editing possible within their application.

## Detailed documents

- [Definitions explained](./docs/definitions.md)
- [API](./docs/api.md)

## License: BSD-3 Clause

Copyright (c) 2021, Kitware Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the <organization> nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
