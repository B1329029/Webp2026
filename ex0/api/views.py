from django.http import HttpResponse

def hello_cgu(request):
    
    return HttpResponse("Hello CGU")