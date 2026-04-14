import graphene
import graphql_jwt
import apps.users.schemas.custom_user as custom_user

class Query(custom_user.custom_user_schema.Query,graphene.ObjectType):
    pass

class Mutation(custom_user.custom_user_schema.Mutation,graphene.ObjectType):
    pass
    
schema = graphene.Schema(query=Query, mutation=Mutation)