from django.shortcuts import render
from .models import Booking,Vendor
from django.shortcuts import redirect
from django.contrib.auth import get_user_model


User = get_user_model()

def book(request):
    if request.method == "POST":
        vendor = Vendor.objects.get(id=request.POST['vendor_id'])

        Booking.objects.create(
            customer=request.user,
            vendor=vendor,
            event_type=request.POST['event_type'],
            event_date=request.POST['event_date'],
            guests=request.POST['guests'],
            phone=request.POST['phone']
        )
        return redirect('home')
def home(request):
    vendors = Vendor.objects.all()
    return render(request, 'index.html', {'vendors': vendors})