import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useDispatch, useSelector } from 'react-redux';
import { setBook, setPreviewStatus } from '../../slices/bookSlice';

function BookPreview() {
  const {bookDetails}=useSelector((state)=>state.book)
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch=useDispatch()


  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }

  function handlePreview() {
    dispatch(setBook(null))
    dispatch(setPreviewStatus(false))
  }

  return (
    <div className='flex flex-col gap-y-4 '>
      <div className='flex p-[50px] bg-[#dedede] mt-[50px] justify-center mx-auto max-w-content'>
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
      <button className='mx-auto gap-2 font-inter text-center text-lg leading-[24px] px-[34px] py-[10px] rounded-md font-bold bg-yellow-50 text-black shadow-[1px_1px_0px_0px_rgba(255,255,255,0.51)]
        hover:scale-95 transition-all duration-200 '
        onClick={()=>handlePreview()}>
          Close Preview
        </button>
    </div>
    
  );
}

export default BookPreview