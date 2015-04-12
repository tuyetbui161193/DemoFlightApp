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
' @@ hightlight id_;_656612_;_script infofile_;_ZIP::ssf315.xml_;_
 @@ hightlight id_;_2426890_;_script infofile_;_ZIP::ssf322.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Dialog("Search Results").Activate @@ hightlight id_;_4720202_;_script infofile_;_ZIP::ssf323.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Dialog("Search Results").Activate @@ hightlight id_;_4720202_;_script infofile_;_ZIP::ssf324.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Dialog("Search Results").WinList("Flight No.").Select "Tuyet                   40        AF        10572         1    2 172.470004/12/2015      Sunday  PAR                         Paris  10:24 AM  FRA                     Frankfurt  01:54 PM" @@ hightlight id_;_5638040_;_script infofile_;_ZIP::ssf325.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Dialog("Search Results").WinButton("OK").Click @@ hightlight id_;_4589234_;_script infofile_;_ZIP::ssf326.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Activate @@ hightlight id_;_2295146_;_script infofile_;_ZIP::ssf327.xml_;_
'Window("Flight Reservation").Activate @@ hightlight id_;_1180810_;_script infofile_;_ZIP::ssf328.xml_;_

'Window("Flight Reservation").Dialog("Open Order").Activate @@ hightlight id_;_723224_;_script infofile_;_ZIP::ssf329.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Activate @@ hightlight id_;_723224_;_script infofile_;_ZIP::ssf330.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Dialog("Search Results").Activate @@ hightlight id_;_2360594_;_script infofile_;_ZIP::ssf332.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Dialog("Search Results").Activate @@ hightlight id_;_2360594_;_script infofile_;_ZIP::ssf333.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Dialog("Search Results").WinList("Flight No.").Activate "Tuyet                   36        AF        10512         1    2 132.470005/20/2015   Wednesday  PAR                         Paris  12:48 PM  FRA                     Frankfurt  04:18 PM" @@ hightlight id_;_133630_;_script infofile_;_ZIP::ssf334.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Activate @@ hightlight id_;_655990_;_script infofile_;_ZIP::ssf335.xml_;_
'Window("Flight Reservation").Activate @@ hightlight id_;_526662_;_script infofile_;_ZIP::ssf336.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Close
'Window("Flight Reservation").Activate @@ hightlight id_;_526662_;_script infofile_;_ZIP::ssf331.xml_;_
