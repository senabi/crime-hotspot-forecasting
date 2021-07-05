#!/usr/bin/env bash

virtualenv -p python3 python_pkgs
source ./python_pkgs/bin/activate
pip install -r requirements.txt
