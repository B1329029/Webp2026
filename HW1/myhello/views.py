from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Course_table


@api_view(['GET'])
def courselist(request):
    courses = Course_table.objects.all().values()
    return Response(list(courses), status=status.HTTP_200_OK)

@api_view(['GET'])
def addcourse(request):
    
    dept = request.GET.get('Department', '')
    title = request.GET.get('CourseTitle', '')
    teacher = request.GET.get('Instructor', '')

    
    if not (dept and title and teacher):
        return Response({"error": "參數缺失，請確認 Department, CourseTitle, Instructor 都有輸入"}, 
                        status=status.HTTP_400_BAD_REQUEST)

    
    if Course_table.objects.filter(CourseTitle=title, Instructor=teacher).exists():
        return Response({"message": f"課程 '{title}' 已經存在資料庫中，不重複新增。"}, 
                        status=status.HTTP_200_OK)

    new_course = Course_table(
        Department=dept,
        CourseTitle=title,
        Instructor=teacher
    )
    new_course.save()
    
    return Response({"message": f"課程 '{title}' 已成功加入！"}, status=status.HTTP_201_CREATED)