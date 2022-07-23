from django.contrib import admin
from .models import User,Product,Order_Items,Payment_Details,Order_Details

admin.site.register(User)
admin.site.register(Product)
admin.site.register(Payment_Details)
admin.site.register(Order_Details)
admin.site.register(Order_Items)
