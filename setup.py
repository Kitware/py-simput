#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import re

from setuptools import setup, find_packages

# perform the install
setup(
    name="simput",
    description="Python toolkit for driving form handling with SimPut",
    long_description="This library is aimed to be used with PyWebVue/Trame to enable form handling of inputs.",
    author="Kitware, Inc.",
    author_email="kitware@kitware.com",
    url=f"https://github.com/kitware/py-simput",
    license="BSD-3-Clause",
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Environment :: Web Environment",
        "License :: OSI Approved :: BSD License",
        "Natural Language :: English",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: JavaScript",
        "Topic :: Software Development :: Libraries :: Application Frameworks",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    keywords="Python Vue.js form",
    packages=find_packages(".", exclude=("tests.*", "tests")),
    package_dir={},
    package_data={},
    include_package_data=True,
    install_requires=["pyyaml>=5.4", "pywebvue"],
)
