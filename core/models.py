from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('vendor', 'Vendor'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
class Vendor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    business_name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    price_per_plate = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.FloatField(default=0)
    description = models.TextField()
    image = models.ImageField(upload_to='vendors/')

    def __str__(self):
        return self.business_name
class Booking(models.Model):
    EVENT_CHOICES = (
        ('wedding', 'Wedding'),
        ('corporate', 'Corporate'),
        ('party', 'Private Party'),
    )

    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    event_type = models.CharField(max_length=20, choices=EVENT_CHOICES)
    event_date = models.DateField()
    guests = models.IntegerField()
    phone = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Pending')

    def __str__(self):
        return f"{self.customer.username} - {self.vendor.business_name}"