import { Grid, Image, Modal } from "@arco-design/web-react";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
interface Props {
  title: string;
  link: string;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}
export default (props: Props) => {
  const [codeImg, setCodeImg] = useState("");
  useEffect(() => {
    QRCode.toDataURL(props.link)
      .then((url) => {
        setCodeImg(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.visible]);

  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
    >
      <Grid.Row align="center" justify="center">
        <Image src={codeImg} alt="qr" />
      </Grid.Row>
    </Modal>
  );
};
