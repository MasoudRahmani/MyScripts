Sub CustomTranslationSaveAs()
    '
    ' CustomSaveAs_Translation Macro
    ' This is a Custom Save for project i am currenlty translating and want to save into their harcoded destination with a shortcut.
    ' This micro should read first line in this word and use it as name to save the file, template if name should be <{project acronym}{episode number}>
    ' from {project acronym} hardcoded path with be decided to save into. eg: SK101 => it means, save to SK project (sword king) for episode 101.
    ' This template should be beside project folder, if decided to seperate this template update "base" path.
    ' also filename should be first line

'Current path
    Dim base As String
    base = ActiveDocument.Path '  "D:\\Documents\\Translation Project\\Manga\\"
    
' Get filename
    Dim arrString() As String, filename As String
    Selection.WholeStory
        arrString = Strings.Split(Selection.Range.Text, vbCr)
    Selection.HomeKey
    filename = arrString(0)
    
' Create project path dic
    Set Projects = CreateObject("Scripting.Dictionary")
    Set fs = CreateObject("Scripting.FileSystemObject")
    
    Projects.Add "SK", fs.BuildPath(base, "Survival Story of Sword King")
    Projects.Add "OP", fs.BuildPath(base, "OP")
    Projects.Add "ELC", fs.BuildPath(base, "Eleceed")
      
' Find path and create filename
    Dim tmp As String: tmp = UCase$(filename)
    
    Dim dItem As Variant, save As Boolean
    For Each dItem In Projects.Keys()
        If tmp Like dItem + "*" Then
            filename = fs.BuildPath(Projects(dItem), filename)
            save = True
        End If
    Next
        
    If save Then
        If fs.FileExists(filename + ".docx") Then
            MsgBox "Not saving: File already exists at target location."
            save = False
        End If
    End If

    MsgBox ("Save: " + CStr(save) + vbCrLf + vbCrLf + "Path:" + IIf((save), filename, " No Valid Name "))
    If save Then
        ActiveDocument.SaveAs filename:=filename, FileFormat:=wdFormatDocumentDefault
    End If

End Sub