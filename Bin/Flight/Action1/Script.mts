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
 @@ hightlight id_;_1312508_;_script infofile_;_ZIP::ssf356.xml_;_
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

' @@ hightlight id_;_1312508_;_script infofile_;_ZIP::ssf339.xml_;_
'Window("Flight Reservation").Dialog("Flight Reservations").Activate @@ hightlight id_;_6161868_;_script infofile_;_ZIP::ssf340.xml_;_
'Window("Flight Reservation").Dialog("Flight Reservations").Click 127,16 @@ hightlight id_;_6161868_;_script infofile_;_ZIP::ssf341.xml_;_
'Window("Flight Reservation").Dialog("Flight Reservations").WinButton("OK").Click @@ hightlight id_;_658256_;_script infofile_;_ZIP::ssf342.xml_;_
'Window("Flight Reservation").Activate @@ hightlight id_;_1312508_;_script infofile_;_ZIP::ssf343.xml_;_
'Window("Flight Reservation").WinMenu("Menu").Select "File;New Order"
'Window("Flight Reservation").WinMenu("Menu").Select "File;Open Order..."
'Window("Flight Reservation").Dialog("Open Order").Activate @@ hightlight id_;_6358476_;_script infofile_;_ZIP::ssf344.xml_;_
'Window("Flight Reservation").Dialog("Open Order").WinCheckBox("Customer Name").Set "ON" @@ hightlight id_;_2754002_;_script infofile_;_ZIP::ssf345.xml_;_
'Window("Flight Reservation").Dialog("Open Order").WinEdit("Edit").Set "tuy" @@ hightlight id_;_8194348_;_script infofile_;_ZIP::ssf346.xml_;_
'Window("Flight Reservation").Dialog("Open Order").WinButton("OK").Click @@ hightlight id_;_1313094_;_script infofile_;_ZIP::ssf347.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Dialog("Search Results").WinList("Flight No.").DblClick 103,13 @@ hightlight id_;_395648_;_script infofile_;_ZIP::ssf348.xml_;_
'Window("Flight Reservation").Dialog("Open Order").Dialog("Search Results").WinButton("OK").Click @@ hightlight id_;_395636_;_script infofile_;_ZIP::ssf349.xml_;_
'Window("Flight Reservation").Activate @@ hightlight id_;_1312508_;_script infofile_;_ZIP::ssf350.xml_;_
'Window("Flight Reservation").Dialog("Flight Reservations").Activate @@ hightlight id_;_2427580_;_script infofile_;_ZIP::ssf351.xml_;_
'Window("Flight Reservation").Dialog("Flight Reservations").WinButton("Yes").Click @@ hightlight id_;_5768828_;_script infofile_;_ZIP::ssf352.xml_;_
'Window("Flight Reservation").Activate @@ hightlight id_;_1312508_;_script infofile_;_ZIP::ssf353.xml_;_
'Window("Flight Reservation").Dialog("Flight Reservations").Close
'Window("Flight Reservation").Activate @@ hightlight id_;_1312508_;_script infofile_;_ZIP::ssf354.xml_;_
'Window("Flight Reservation").WinMenu("Menu").Select "File;Open Order..."
'Window("Flight Reservation").Dialog("Flight Reservations").WinButton("No").Click @@ hightlight id_;_1772218_;_script infofile_;_ZIP::ssf355.xml_;_
'Window("Flight Reservation").Activate
