"""
Rate Limiter Utility

This module instantiates the SlowAPI Limiter. It checks request IP addresses
to enforce rate limits across endpoints.
"""

from slowapi import Limiter
from slowapi.util import get_remote_address

# Create a single global Limiter instance using client's IP address as the key
# get_remote_address retrieves the IP address of the incoming request client.
limiter = Limiter(key_func=get_remote_address)
