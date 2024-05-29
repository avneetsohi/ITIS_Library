import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useSelector } from 'react-redux';

function BookPreview() {
  const {bookDetails}=useSelector((state)=>state.book)
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }

  return (
    <div className='p-[50px] bg-[#dedede] mt-[50px] flex justify-center mx-auto max-w-content'>
      <Document file={`http://localhost:3000/Books/${bookDetails.filePath}`} onLoadSuccess={onDocumentLoadSuccess}>
        {
            Array.apply(null,Array(10)).map((x,i)=>i+1).map(page=>(
                <div>
                    {
                        <p>
                            Page {page} of {numPages}
                        </p>
                    }
                    <Page pageNumber={page} 
                        renderTextLayer={false} 
                        renderAnnotationLayer={false}
                        width={800}
                    />
                </div>
            ))
        }  
      </Document>
    </div>
  );
}

export default BookPreview