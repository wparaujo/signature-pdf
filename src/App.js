import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Document, Page, pdfjs } from 'react-pdf'
// import myPDF from 'file.pdf'

function App() {

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [file, setFile] = useState(null)

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages({ numPages })

  const goToPrevPage = () => setPageNumber(pageNumber - 1)
  const goToNextPage = () => setPageNumber(pageNumber + 1)

  return (
    <div>
      <input type="file" name="file" accept="application/pdf" onChange={ (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
        } }/>
      <nav>
        <button onClick={goToPrevPage}>Anterior</button>
        <button onClick={goToNextPage}>Próximo</button>
      </nav>

      <div>
        <Document
          file={file}
          onLoadSuccess={ onDocumentLoadSuccess }
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>

      {/* Página {pageNumber} de {numPages} */}
    </div>
  );
}

export default App;


/* <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a */
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //   <InputFile />
    // </div></div>
