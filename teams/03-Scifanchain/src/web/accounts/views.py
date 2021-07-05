from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.views import LoginView
from stories.models import Stage, StageForm


class SigninView(LoginView):
    redirect_authenticated_user = True

def index(request):
    return HttpResponse('This ia accounts index')

def signup(request):
    return render(request, 'accounts/signup.html')

def dashboard(request):
    stages = Stage.objects.all()[:5]

    if request.method == 'POST':
        stage_form = StageForm(data=request.POST)
        if stage_form.is_valid():
            instance = stage_form.save(commit=False)
            instance.owner = request.user
            instance.save()
            # stage_form.save_m2m()
    else:
        stage_form = StageForm()
    return render(request, 'accounts/dashboard.html', {'form':stage_form, 'stages':stages})


def stage(request, id):
    stage = get_object_or_404(Stage, id=id)
    return render(request, 'accounts/stage.html', {'stage': stage})
