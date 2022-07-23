from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets,generics,status
from user.serializer import UserSerializer,ProductSerializer,Order_ItemsSerializer,Payment_DetailsSerializer,Order_DetailsSerializer
from user.models import User,Product,Order_Items,Payment_Details,Order_Details
from product.models import Cart,Shipping_Address,Track_Repairs,NFT_Details
from product.serializer import CartSerializer,Shipping_AddressSerializer,Track_RepairsSerializer,NFT_DetailsSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import F

@api_view(['GET'])
def product_list(request):
    product = Product.objects.all().order_by('name')
    serializer = ProductSerializer(product,many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view(['POST'])
def AddProduct(request,id):
    request.data['user_id'] = id
    #check statement to check if customer or retailer
    serializer=ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)

@api_view(['GET'])
def product_detail(request,id):
    try:
        product = Product.objects.get(pk=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['PUT'])
def update_product_detail(request,rid,pid):
    try:
        product = Product.objects.get(pk=pid)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    request.data['user_id'] = rid
    serializer = ProductSerializer(product,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_product(request,id):
    try:
        product = Product.objects.get(pk=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def cart_list(request,id):
    try:
        cart = Cart.objects.filter(user_id=id)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CartSerializer(cart,many=True)
    ls = []
    total = 0
    print(serializer.data)
    for i in serializer.data:
        dict1 = {}
        product = Product.objects.get(id=i['product_id'])
        dict1['id'] = i['id']
        dict1['date_added'] = i['date_added']
        dict1['product_id'] = i['product_id']
        dict1['user_id'] = i['user_id']
        dict1['name'] = product.name
        dict1['price'] = product.price
        dict1['quantity'] = i['quantity']
        dict1['total_amount'] = i['total_amount']
        ls.append(dict1)
    return Response(ls)

@api_view(['GET'])
def total_cart_price(request,id):
    try:
        cart = Cart.objects.filter(user_id=id)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CartSerializer(cart,many=True)
    ls = []
    total = 0
    print(serializer.data)
    for i in serializer.data:
        dict1 = {}
        product = Product.objects.get(id=i['product_id'])
        dict1['id'] = i['id']
        dict1['date_added'] = i['date_added']
        dict1['product_id'] = i['product_id']
        dict1['user_id'] = i['user_id']
        dict1['name'] = product.name
        dict1['price'] = product.price
        dict1['quantity'] = i['quantity']
        dict1['total_amount'] = i['total_amount']
        total+=i['total_amount']
        ls.append(dict1)
    final = []
    dict2={'total':total}
    final.append(dict2)
    return Response(final)

@api_view(['DELETE'])
def remove_item(request,uid,pid):
    try:
        cart = Cart.objects.filter(user_id = uid,product_id=pid)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    cart.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def AddItem(request,uid,pid):
    request.data['user_id']=uid
    request.data['product_id']=pid
    request.data['quantity'] = 1
    product = Product.objects.get(pk=pid)
    serializer1 = ProductSerializer(product)
    request.data['total_amount']=serializer1.data['price']
    serializer=CartSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
def clear_cart(request,id):
    try:
        cart = Cart.objects.filter(user_id=id)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    cart.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
def update_quant_and_total(request,uid,pid):
    try:
        cart = Cart.objects.filter(user_id=uid)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CartSerializer(cart,many=True)
    ls = []
    for i in serializer.data:
        if i['product_id']==pid:
            dict1 = {}
            cart1 = Cart.objects.get(id=i['id'])
            product = Product.objects.get(id=i['product_id'])
            dict1['quantity'] = i['quantity']+1
            dict1['total_amount'] = i['total_amount']+product.price
            ls.append(dict1)
    request.data['user_id'] = uid
    request.data['product_id'] = pid
    request.data['quantity'] = ls[0]['quantity']
    request.data['total_amount'] = ls[0]['total_amount']
    serializer = CartSerializer(cart1,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def dec_quant_and_total(request,uid,pid):
    try:
        cart = Cart.objects.filter(user_id=uid)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CartSerializer(cart,many=True)
    ls = []
    for i in serializer.data:
        if i['product_id']==pid:
            dict1 = {}
            cart1 = Cart.objects.get(id=i['id'])
            product = Product.objects.get(id=i['product_id'])
            dict1['quantity'] = i['quantity']-1
            dict1['total_amount'] = i['total_amount']-product.price
            ls.append(dict1)
    request.data['user_id'] = uid
    request.data['product_id'] = pid
    request.data['quantity'] = ls[0]['quantity']
    request.data['total_amount'] = ls[0]['total_amount']
    serializer = CartSerializer(cart1,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def order_items(request,id):
    order = Order_Items.objects.filter(user_id=id)
    serializer = Order_ItemsSerializer(order,many=True)
    ls = []
    print(request.user)
    for i in serializer.data:
        dict1 = {}
        product = Product.objects.get(id=i['product_id'])
        dict1['id'] = i['id']
        dict1['user_id'] = i['user_id']
        dict1['order_date'] = i['order_date']
        dict1['name'] = product.name
        dict1['price'] = product.price*i['quantity']
        dict1['quantity'] = i['quantity']
        ls.append(dict1)
    return Response(ls)

@api_view(['POST'])
def AddOrder(request,id):
    try:
        cart = Cart.objects.filter(user_id=id)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CartSerializer(cart,many=True)
    ls = []
    for i in serializer.data:
        dict1 = {}
        dict1['product_id'] = i['product_id']
        dict1['user_id'] = i['user_id']
        dict1['quantity'] = i['quantity']
        ls.append(dict1)
    for i in range(len(ls)):
        request.data['user_id'] = ls[i]['user_id']
        request.data['product_id'] = ls[i]['product_id']
        request.data['quantity'] = ls[i]['quantity']
        print(request.data)
        serializer=Order_ItemsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
    return Response(ls)

@api_view(['PUT'])
def ship_address(request,id):
    try:
        ship = Shipping_Address.objects.get(user_id=id)
    except Shipping_Address.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    request.data['user_id'] = id
    serializer = Shipping_AddressSerializer(ship,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def order_details(request,id):
    request.data['payment_id']=id
    serializer=Order_DetailsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
