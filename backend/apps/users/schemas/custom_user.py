import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
import graphql_jwt
from graphql_jwt.shortcuts import get_token

User = get_user_model()

class CustomUserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id",
                   "email",
                   "username",
                   "role",
                   "phone_number",
                   "profile_photo",
                   "created_at",)
        
class Query(graphene.ObjectType):
    all_users = graphene.List(CustomUserType)
    user_by_email = graphene.Field(CustomUserType, email=graphene.String(required=True))
    me = graphene.Field(CustomUserType)

    def resolve_all_users(root, info):
        return User.objects.all()
    
    def resolve_user_by_email(root, info, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            return None
        
    def resolve_me(root, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not logged in!")
        return user
        
class CreateUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        role = graphene.String()

    user = graphene.Field(CustomUserType)
    token = graphene.String()

    def mutate(self, info, email, username, password, role='customer'):
        if User.objects.filter(email=email).exists():
            raise Exception("A user with this email already exists.")
        if role not in ['customer', 'provider']:
            raise Exception("Role must be 'customer' or 'provider'.")
        user = User.objects.create_user(email=email, username=username, password=password, role=role)

        token = get_token(user)
        return CreateUser(user=user, token=token)
    
class UpdateProfile(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        phone_number = graphene.String()

    user = graphene.Field(CustomUserType)

    def mutate(self, info, username=None, phone_number=None):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("You must be logged in to update your profile.")
        if username:
            user.username = username
        if phone_number:
            user.phone_number = phone_number
        user.save()
        return UpdateProfile(user=user)
    
class ChangePassword(graphene.Mutation):
    class Arguments:
        old_password = graphene.String(required=True)
        new_password = graphene.String(required=True)

    success = graphene.Boolean()

    def mutate(self, info, old_password, new_password):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("You must be logged in to change your password.")
        if not user.check_password(old_password):
            raise Exception("Old password is incorrect.")
        if len(new_password) < 8:
            raise Exception("New password must be at least 8 characters long.")
        user.set_password(new_password)
        user.save()
        return ChangePassword(success=True)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_profile = UpdateProfile.Field()
    change_password = ChangePassword.Field()

    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

custom_user_schema = graphene.Schema(query=Query, mutation=Mutation)