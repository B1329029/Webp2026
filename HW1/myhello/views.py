from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Course_table

# 1. 回傳課程列表 (courselist)
@api_view(['GET'])
def courselist(request):
    courses = Course_table.objects.all().values()
    return Response(list(courses), status=status.HTTP_200_OK)

# 2. 加入課程 (addcourse)
@api_view(['GET'])
def addcourse(request):
    # 1. 取得參數
    dept = request.GET.get('Department', '')
    title = request.GET.get('CourseTitle', '')
    teacher = request.GET.get('Instructor', '')

    # 2. 檢查參數是否齊全
    if not (dept and title and teacher):
        return Response({"error": "參數缺失，請確認 Department, CourseTitle, Instructor 都有輸入"}, 
                        status=status.HTTP_400_BAD_REQUEST)

    # 3. 【關鍵】檢查資料庫是否已經有這門課了
    # 這裡判斷「課程名稱」和「老師」是否同時重複
    if Course_table.objects.filter(CourseTitle=title, Instructor=teacher).exists():
        return Response({"message": f"課程 '{title}' 已經存在資料庫中，不重複新增。"}, 
                        status=status.HTTP_200_OK)

    # 4. 存入資料庫
    new_course = Course_table(
        Department=dept,
        CourseTitle=title,
        Instructor=teacher
    )
    new_course.save()
    
    return Response({"message": f"課程 '{title}' 已成功加入！"}, status=status.HTTP_201_CREATED)