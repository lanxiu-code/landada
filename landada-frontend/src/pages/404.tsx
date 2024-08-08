import { Result, Button } from '@arco-design/web-react';
import { useNavigate } from 'umi';
export default () => {
  let navigate = useNavigate();
  return (
    <div>
      <Result
        status='404'
        subTitle='没有找到页面'
        style={{marginTop: '20%'}}
        extra={[
          <Button key='again' style={{ margin: '0 16px' }}>
            Again
          </Button>,
          <Button key='back' type='primary' onClick={() => navigate(-1)}>
            Back
          </Button>,
        ]}
      ></Result>
    </div>
  );
};
