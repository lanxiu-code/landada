import { Editor } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import "./index.less";
import "@wangeditor/editor/dist/css/style.css";
import { useEffect, useState } from "react";
interface Props {
  value: string;
  mode?: string;
  handleChange: (editor: IDomEditor) => void;
}
export default (props: Props) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};
  // 编辑器配置
  let editorConfig: Partial<IEditorConfig> = {
    readOnly: true,
  };
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  return (
    <div className="MdViewer">
      <Editor
        defaultConfig={editorConfig}
        value={props.value}
        onCreated={setEditor}
        mode="default"
        onChange={props.handleChange}
        style={{ height: "500px", overflowY: "hidden" }}
      />
    </div>
  );
};
