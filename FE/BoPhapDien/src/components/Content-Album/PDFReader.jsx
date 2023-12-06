import React, { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';

const PDFReader = ({ heading_id }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaderPDF = async () => {
      try {
        const loader = await import(`../../data/datasets/${heading_id}.html.pdf`);
        setContent(loader.default);
      } catch (error) {
        console.error('Error loading PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    loaderPDF();
  }, [heading_id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <object data={content} type="application/pdf" width="100%" height="600px">
      <p>Trình duyệt của bạn không hỗ trợ xem PDF. Bạn có thể <a style={{ ":hover": "red" }} href={content}>tải xuống file</a> thay vì xem trực tuyến.</p>
    </object>
  );
};

export default PDFReader;





