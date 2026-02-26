from django.contrib import admin
from .models import User, Vendor, Booking

admin.site.register(User)
admin.site.register(Vendor)
admin.site.register(Booking)