from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello_cgu(request):
    name_param = request.query_params.get('name')

    if name_param is None or name_param == "":
        return Response({
            "res": "parameter: name is None"
        })
    else:
        return Response({
            "data": f"Hello {name_param}"
        })