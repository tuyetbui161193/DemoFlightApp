'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
' Script name: DatabaseFunctions.vbs
'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Option Explicit

Const SQL_OUTPUT_FILE = "C:\Windows\SQLOutput.txt"


'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
' Function Name: Database_RunSQLQueryFromConsole
'
' Description: Run A SQL Command From Console
'              
' Parameter:   
'	- strSQLCommand : SQL command
'
' Return value: 
'
' History:     
'	- 2012-02-03 | Initial Revision
'
'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Function Database_RunSQLQueryFromConsole(strSQLCommand)  
	Set oWshShell = CreateObject("Wscript.Shell")
	oWshShell.Run "sqlcmd -S " & SQL_SERVERNAME & " -U " & SQL_LOGIN & " -P " & SQL_PASSWORD &_
		" -Q " & """" & strSQLCommand & """" & " -o " & SQL_OUTPUT_FILE, 2, True
	Set oWshShell = Nothing	
End Function


'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
' Function Name: Database_RunSQLInputFileFromConsole
'
' Description: Run SQL Input file From Console
'              
' Parameter:   
'	- strSQLInputFile : SQL Input file
'
' Return value: 
'
' History:     
'	- 2012-02-03 | Initial Revision
'
'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Function Database_RunSQLInputFileFromConsole(strSQLInputFile)  
	Set oWshShell = CreateObject("Wscript.Shell")
	oWshShell.Run "sqlcmd -S " & SQL_SERVERNAME & " -U " & SQL_LOGIN & " -P " & SQL_PASSWORD &_
		" -i " & """" & strSQLInputFile & """" & " -o " & SQL_OUTPUT_FILE, 2, True
	Set oWshShell = Nothing	
End Function



'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
' Function Name: Database_ExecuteSQLStatement
'
' Description: Execute an SQl Statement
'              
' Parameter:   
'	- strSQLStatement : SQL Statement
'
' Return value: 1: Execute successfully; Other: Not successfully
'
' History: 
'	- 2011-12-14 | Initial Revision
'
'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Function Database_ExecuteSQLStatement(strSQLStatement, intRecordCount)
	Dim objRecordset, objCommand, strConnection
	strConnection = "Driver=SQL Server;server=" & SQL_SERVERNAME & ";UID=" & SQL_LOGIN & ";PWD=" & SQL_PASSWORD	
	Set objCommand = Createobject("ADODB.Command")
	Set objRecordset = Createobject("ADODB.Recordset")	
	'On Error Resume Next
	objCommand.Activeconnection = strConnection
	objCommand.CommandText = strSQLStatement
	objRecordset.Open strSQLStatement, strConnection, 3,3
	intRecordCount = objRecordset.RecordCount 	
	Set commandObj = Nothing
	Set recordsetObj = Nothing	
End Function



'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
' Function Name: Database_CreateDatabase
'
' Description: Create a Database
'              
' Parameter:   
'	- strDBName : Database Name
'
' Return value: 1: Create successfully; Other: Not successfully
'
' History: 
'	- 2011-12-14 | Initial Revision
'
'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Function Database_CreateDatabase(strDBName)	
	Dim rc, strSQLStatement
	strSQLStatement = "Create Database " & strDBName
	strSQLStatement = "Create Database " & strDBName
	OS_KillProcess SQL_SERVERNAME, "MSSQLSERVER"
	If OS_StartService("MSSQLSERVER") <> 1 Then
		ReportAction -1, "Database_CreateDatabase", "Failed to Start 'MSSQLSERVER' service"
		Database_CreateDatabase = -1
		Exit Function
	End If
	rc = Database_ExecuteSQLStatement(strSQLStatement, intRecordCount)		
	Database_CreateDatabase = 1
End Function



'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
' Function Name: Database_DropDatabase
'
' Description: Drop a Database
'              
' Parameter:   
'	- strDBName : Database Name
'
' Return value: 1: Drop successfully; Other: Not successfully
'
' History: 
'	- 2011-12-14 | Initial Revision
'
'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Function Database_DropDatabase(strDBName)	
	Dim rc, strSQLStatement
	strSQLStatement = "Drop Database " & strDBName
	OS_KillProcess SQL_SERVERNAME, "MSSQLSERVER"
	If OS_StartService("MSSQLSERVER") <> 1 Then
		ReportAction -1, "Database_DropDatabase", "Failed to Start 'MSSQLSERVER' service"
		Database_DropDatabase = -1
		Exit Function
	End If
	rc = Database_ExecuteSQLStatement(strSQLStatement, intRecordCount)      	
	Database_DropDatabase = 1	
End Function


'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
' Function Name: Database_CreateDatabaseFromConsole
'
' Description: Create Database From Console
'              
' Parameter:   
'	- strDBName : Database name
'
' Return value: 
'
' History: 
'	- 2011-12-14 | Initial Revision
'
'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Function Database_CreateDatabaseFromConsole(strDBName)	
	Dim strDatabaseString, arr
	strDatabaseString = SQL_SERVERNAME & " ," & SQL_LOGIN & ", " & SQL_PASSWORD & "," & strDBName
	arr = Split(strDatabaseString,",")
	For i=0 To Ubound(arr)
		arr(i) = Trim(arr(i))
	Next
	Set oWshShell = CreateObject("Wscript.Shell")
	oWshShell.Run "sqlcmd -S " & arr(0) & " -U " & arr(1) & " -P " & arr(2) & " -Q " &_
		"""" & "create database " & arr(3) & """", 2, True
	Set oWshShell = Nothing
	Wait 3
End Function


'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
' Function Name: Database_DropDatabaseFromConsole
'
' Description: Drop Database From Console
'              
' Parameter:   
'	- strDBName : Database name
'
' Return value: 
'
' History: 
'	- 2011-12-14 | Initial Revision
'
'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Function Database_DropDatabaseFromConsole(strDBName)	
	Dim strDatabaseString, arr
	strDatabaseString = SQL_SERVERNAME & " ," & SQL_LOGIN & ", " & SQL_PASSWORD & "," & strDBName
	arr = Split(strDatabaseString,",")
	For i=0 To Ubound(arr)
		arr(i) = Trim(arr(i))
	Next
	Set oWshShell = CreateObject("Wscript.Shell")
	oWshShell.Run "sqlcmd -S " & arr(0) & " -U " & arr(1) & " -P " & arr(2) & " -Q " &_
		"""" & "drop database " & arr(3) & """", 2, True
	Set oWshShell = Nothing
	Wait 3
End Function



'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
' Function Name: Database_GetQueryResult
'
' Description: Export SQL Query Result to an array
'              
' Parameter:   
'	- strSQLStatement : SQL statement
'	- arrResult: Result array
'
' Return value: 1: Array has value; Others: Array has no value
'
' History: 
'	- 2011-04-27 | Initial Revision
'
'=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Function Database_GetQueryResult(strSQLStatement, arrResult)
	Dim objRecordset, objCommand, strConnection
	Dim str
	strConnection = "Driver=SQL Server;server=" & SQL_SERVERNAME & ";UID=" & SQL_LOGIN & ";PWD=" & SQL_PASSWORD	
	Set objCommand = Createobject("ADODB.Command")
	Set objRecordset = Createobject("ADODB.Recordset")	
	objCommand.Activeconnection = strConnection
	objCommand.CommandText = strSQLStatement
	objRecordset.Open strSQLStatement, strConnection, 3,3
	intRecordCount = objRecordset.RecordCount 
	If intRecordCount < 1 Then
		Database_GetQueryResult = -1
		Exit Function
	End If
	Do While Not objRecordset.EOF
		If str <> "" Then
			str = str & "," & objRecordset(0).Value	
		Else
			str = str & objRecordset(0).Value	
		End If
		objRecordset.MoveNext
	Loop
	arrResult = Split(str, ",")	
	Set commandObj = Nothing
	Set recordsetObj = Nothing	
	Database_GetQueryResult = 1
End Function
