#! /bin/sh
"""
Script for install yarn dependancies and run app in dev mode.
"""

yarn

exec yarn dev --host
