from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello_cgu(request):
    # 抓取 name 的值
    name_param = request.query_params.get('name')

    # 判斷：如果完全沒給 name，或是給了 name 但內容是空的
    if name_param is None or name_param == "":
        return Response({
            "res": "parameter: name is None"
        })
    else:
        return Response({
            "data": f"Hello {name_param}"
        })