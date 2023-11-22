from django.http import HttpResponse
from django.template import loader
# Create your views here.

def home(request):
    template = loader.get_template("base.html")
    context = {

    }
    return HttpResponse(template.render(context, request))