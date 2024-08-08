import { Editor, Toolbar } from "@wangeditor/editor-for-react";
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
  const [html, setHtml] = useState("<p>hello</p>");
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};
  // 编辑器配置
  let editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: "请输入内容...",
    MENU_CONF: {
      // fontFamily: {
      //   fontSizeList: ["12px", "16px", { name: "24px", value: "24px" }, "40px"],
      //   fontFamilyList: ["黑体", "楷体", { name: "仿宋", value: "仿宋" }],
      // },
    },
  };
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  return (
    <div className="MdEditor">
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: "1px solid #ccc" }}
      />
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
