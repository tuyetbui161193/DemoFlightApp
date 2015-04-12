Option Explicit @@ hightlight id_;_65782_;_script infofile_;_ZIP::ssf51.xml_;_
		
Dim rc, i, strTestSetName, arrTestSet, strReportFile, iElapsedTime

Preset_TestSet
OS_KillProcess LOCAL_HOST_NAME, EXCEL_PROCESS_NAME 
'----------------------------------------------
' Đường dẫn đến thư mục chứa app cần test @@ hightlight id_;_3081896_;_script infofile_;_ZIP::ssf45.xml_;_
'----------------------------------------------
APPLICATION_PATH = "D:\NienLuan_LuanVan\LuanVan\Demo\Built\app\flight4a.exe"

Datatable.AddSheet("TestCase")
'MsgBox TESTCASE_FOLDER & TESTCASE_SOURCE
Datatable.ImportSheet TESTCASE_FOLDER & TESTCASE_SOURCE, "TestCase", "TestCase" 
'Datatable.ImportSheet "D:\NienLuan_LuanVan\LuanVan\Demo\Testcase\TestCase.xls", "TestCase", "TestCase" 
arrTestSet = Split(TESTSET_ARRAY, ";")
Datatable.AddSheet("TestSet")

For i = 0 To Ubound(arrTestSet)	

	' Load Testset
	strTestSetName = Trim(arrTestSet(i))
	If Right(strTestSetName, 4) <> ".xls" Then
		strTestSetName = strTestSetName & ".xls"
	End If
	Datatable.ImportSheet TESTSET_FOLDER & strTestSetName, "TestSet", "TestSet"
	'DataTable.Export TESTSET_FOLDER & "import_file.xls"
	' Run Testset	
	Dim StartTime: StartTime = Now()	
	LogMessage(vbCrLf & "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
	LogMessage("Test Set: " & strTestSetName)
	RunTestSet()
	LogMessage(" ")
	LogMessage("Complete Test Set: " & strTestSetName)
	LogMessage(" ")
	
	Dim EndTime: EndTime = Now()
	' Update Testset Result	
	UpdateTestSetResult(strTestSetName)	
	' Export Result	
	iElapsedTime = TimeSpan(StartTime, EndTime) 
	strReportFile = GenerateTestReport(strTestSetName, iElapsedTime)  	
	Print vbCrLf
	Print "Total TCs" & vbTab & ": " & Environment.Value("ITOTAL") 
	Print "   . Passed" & vbTab & ": " & Environment.Value("IPASSED") 
	Print "   . Failed" & vbTab & ": " & Environment.Value("IFAILED") 
	Print "   . Blocked" & vbTab & ": " & Environment.Value("IBLOCKED") 
	Print "   . No Run" & vbTab & ": " & Environment.Value("INORUN")
	' Send Result email
'	If REPORT_SEND_EMAIL Then
	'	SendTestSetResultEmail strTestSetName, strReportFile
'	End If
'	' Upload Test result to ALM
	If UPLOAD_RESULT Then	
		UploadTestSetResult strTestSetName
	End If
	Next
	
	'===================================================
 @@ hightlight id_;_65806_;_script infofile_;_ZIP::ssf297.xml_;_
