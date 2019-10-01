import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Document, Page, pdfjs } from 'react-pdf'
import { Button, Modal } from 'react-bootstrap'
import SignatureCanvas from 'react-signature-canvas'
import { PDFDocument } from 'pdf-lib'

async function modifyPDF(pdf) {
  const reader = new FileReader()
  // const unint = new Uint8Array(pdf)
  reader.readAsArrayBuffer(pdf)
  reader.onload = async () => {
    console.log(reader.result)
    const pdfDoc = await PDFDocument.load(reader.result)
    const pages = pdfDoc.getPages()
    console.log(pages)
    pages[0].drawText('You can modify PDFs too!')
    const pdfBytes = await pdfDoc.save()
    console.log(pdfBytes)
    const blob = new Blob(pdfBytes, {type:'application/pdf'})
    console.log(blob)
  }
}

const SignatureModal = (props) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleSave = (ref) => {
    ref.toDataURL()
  }

  const sigPad = (ref) => {

  }
  
  var algo = {}

  return(
    (
  
      <>
        <Button variant="primary" onClick={handleShow}>
            Criar Assinatura
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Criar Assinatura</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SignatureCanvas 
                ref={ (ref) => sigPad(ref) }
                canvasProps={{
                  width: 500,
                  height: 200
                }
              } />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
              <Button variant="primary" onClick={handleSave()}>
                Salvar
              </Button>
            </Modal.Footer>
        </Modal>
      </>
    )
  )
}

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
        modifyPDF(event.target.files[0])
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
      <SignatureModal />
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
