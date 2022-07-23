from django.urls import path,include
from . import views
from rest_framework import routers

urlpatterns = [
    path('product/',views.product_list),
    path('product/<int:id>/add/',views.AddProduct),
    path('product/<int:id>/',views.product_detail),
    path('product/<int:rid>/<int:pid>/update/',views.update_product_detail),
    path('product/<int:id>/delete/',views.delete_product),
    path('cart/<int:id>/',views.cart_list),
    path('cart/<int:uid>/<int:pid>/delete/',views.remove_item),
    path('cart/<int:uid>/<int:pid>/add/',views.AddItem),
    path('cart/<int:id>/clear/',views.clear_cart),
    path('cart/<int:uid>/<int:pid>/',views.update_quant_and_total),
    path('order/<int:id>/',views.order_items),
    path('order/<int:id>/add/',views.AddOrder),
    path('order/<int:id>/ship/',views.ship_address),
    path('order/<int:id>/detail/',views.order_details),
    path('cart/<int:uid>/<int:pid>/dec/',views.dec_quant_and_total),
    path('cart/<int:id>/total/',views.total_cart_price),

]
