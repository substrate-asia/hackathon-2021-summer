from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(
        max_length=10,
        label="",
        widget=forms.TextInput(attrs={'class':'form-control border-300 mt-3'})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class':'form-control border-300 mt-3'}),
        max_length=200,
        )
    your_name = forms.CharField(label='Your name', max_length=100)

    