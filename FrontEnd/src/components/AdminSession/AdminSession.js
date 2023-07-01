import React, { useState, useEffect } from 'react';
import './AdminSession.css';
import {imgList} from './ImageList';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const { ethers } = require("ethers");
const provider = new ethers.providers.Web3Provider(window.ethereum);
const MainContractData = require('../../contracts/ContractInfo')
//const arraySeesion = require('../../mockData/mocksession.json')

function AdminSession() {

    const mainContract = new ethers.Contract(MainContractData.address,MainContractData.abi, provider);
    const [imgLink, setImgLink] = useState("");
    const [arraySeesion, setArraySession] = useState([])
    const [modalChangeState, setOpenChangeState] = React.useState(false);
    const [modalCreateSession, setOpenSession] = React.useState(false);
    const navigate = useNavigate();
    const [textAmount, setTexAmount] = useState("");
    const [txtError, setTxtError] = useState("");
    const [txhash, setTxhash] = useState("");
    const [sessionChoose, setSessionChooose] = useState({})
    // const [addressSession, setAdressSession] = useState("")
    // const [state, setSate] = useState(0)
    

    window.ethereum.on('accountsChanged', function (accounts) {
        navigate("/")
    });

    const fetchData = async ()=> {
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = ethers.utils.getAddress(accounts[0]);
        const responseSession = await fetch(`http://localhost:3001/sessions`);
        const array = await responseSession.json()
        setArraySession(array)

        let stringLink = "http://localhost:8080/ipfs/QmZjeSx2WvQcCt9QKNV7hS7Q3fBhLMKVwJLUjD4ingNFZR/"
        stringLink = stringLink + "01.png"
        setImgLink(stringLink)
    }

    const PreChangeState = async(session) => {
        setSessionChooose(session)

        if(session.state < 2) {
            setTexAmount("pending")
            setOpenChangeState(true)
            ChangeState(session)
            return 
        }
        setTexAmount("")
        setOpenChangeState(true)
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setTexAmount("");
        setOpenChangeState(false);
        setOpenSession(false)
        fetchData();
    }

    const ChangeStateClosed = async (session) => {
        setTexAmount("pending")
        const finalPrice = parseInt(document.getElementById("num_final_price").value) *  1000
        const sessionContract = new ethers.Contract(session.addressSession ,MainContractData.sessionABI,provider)
        const signer =  provider.getSigner();
        const contractWithSig = sessionContract.connect(signer);
        try {
            const register_user_tx = await contractWithSig.calculateDeviation(finalPrice)
            const waitUpdate = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(register_user_tx.hash);
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(register_user_tx.hash)
                    clearInterval(waitUpdate);
                }
            },5000)
        } catch (error) {
            const err = error.toString();
            const err_detail = "Error detail : " + err.substring(7,32);
            setTexAmount("error");
            setTxtError(err_detail);
        }
    }


    const ChangeState = async (session) => {
        const sessionContract = new ethers.Contract(session.addressSession ,MainContractData.sessionABI,provider)
        const signer =  provider.getSigner();
        const contractWithSig = sessionContract.connect(signer);
        switch (session.state) {
            case 0:
                try {
                    const register_user_tx = await contractWithSig.alowVotingState()
                    const waitUpdate = setInterval(async function() {
                        const txReceipt = await provider.getTransactionReceipt(register_user_tx.hash);
                        if (txReceipt && txReceipt.blockNumber) {
                            setTexAmount("success");
                            setTxhash(register_user_tx.hash)
                            clearInterval(waitUpdate);
                        }
                    },5000)
                } catch (error) {
                    const err = error.toString();
                    const err_detail = "Error detail : " + err.substring(7,32);
                    setTexAmount("error");
                    setTxtError(err_detail);
                }
            case 1:
                try {
                    const register_user_tx = await contractWithSig.caclculatePropose()
                    const waitUpdate = setInterval(async function() {
                        const txReceipt = await provider.getTransactionReceipt(register_user_tx.hash);
                        if (txReceipt && txReceipt.blockNumber) {
                            setTexAmount("success");
                            setTxhash(register_user_tx.hash)
                            clearInterval(waitUpdate);
                        }
                    },5000)
                } catch (error) {
                    const err = error.toString();
                    const err_detail = "Error detail : " + err.substring(7,32);
                    setTexAmount("error");
                    setTxtError(err_detail);
                }
        }
    }
    const GetNameState = (stateNumber) => {
        switch (stateNumber) {
            case 0:
                return <div className='state_con'>
                    <div className='creating_state state'>Creating</div>
                </div>;
            case 1:
                return <div className='state_con'>
                    <div className='voting_state state'>Voting</div>
                </div>;
            case 2:
                return <div className='state_con'>
                    <div className='creating_state state'>Closing</div>
                </div>
            case 3:
                return <div className='state_con'>
                    <div className='closed_state state'>Closed</div>
                </div>
        }
    }

    const GetButtonChangeState = (session) => {
        switch (session.state) {
            case 0:
                return <div>
                    <button className='buttonState buttVotting' onClick={() => PreChangeState(session)}>Votting</button>
                </div>
            case 1:
                return <div>
                 <button className='buttonState buttColosing' onClick={() => PreChangeState(session)}>Closing</button>
                </div>
            case 2: 
                return <div>
                    <button className='buttonState buttClosed' onClick={() => PreChangeState(session)}>Closed </button>
                </div>
        }
    }

    const CreSession = async () => {
        setTexAmount("pending")
        setOpenSession(true)
        const product_name = document.getElementById('product_name').value
        const product_description = document.getElementById('product_description').value
        const product_img = [imgLink]

        const signer =  provider.getSigner();
        const contractWithSig = mainContract.connect(signer);
        try {
            const txn_cre_session = await contractWithSig.createNewSession(product_name,product_description, product_img)
            const waitUpdate = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(txn_cre_session.hash);
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(txn_cre_session.hash)
                    clearInterval(waitUpdate);
                }
            },4000)
        } catch (error) {
            const err = error.toString();
            const err_detail = "Error detail : " + err.substring(7,32);
            setTexAmount("error");
            setTxtError(err_detail);
        }
    }

    const updateImage = event => {
        let stringLink = "http://localhost:8080/ipfs/QmZjeSx2WvQcCt9QKNV7hS7Q3fBhLMKVwJLUjD4ingNFZR/"
        stringLink = stringLink + event.target.value + ".png"
        setImgLink(stringLink)
    }

    const getFriceDiv = (value) => {
        const ans = parseFloat(value / 1000)
        return ans 
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div className='admin-session-container'>
            <div className="session-container">
                <div className='create-session-container'>
                    <div className='create_text'>Create New Session</div>
                    <div>
                        <div className='text_label_create'>Product Name :</div>
                        <input type="text" className='input-product-name' id="product_name" name="fname"/>
                        <div className='text_label_create'>Product Description : </div>
                        <textarea type="text" id="product_description" name="fname" className='input_product_description'/>
                        <div className='choose_image_container'>
                            <div className='text_label_create'>Product Images :</div>
                            <select className="choose_img" onChange={updateImage}>
                            {
                                imgList.map((imgProduct) => {
                                    return(
                                        <option className='option_img' value={imgProduct.id} >{imgProduct.title}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                    </div>
                    <div className='img_container' >
                        <img className='img_of_product' src={imgLink}/>
                    </div>
                    <button className='button-create-session' onClick={CreSession}>Create</button>
                </div>
                <div className='list-session-container'>
                    <div className='list_session_title'>List Session</div>
                    <div className='list_session_info'>
                        {
                            arraySeesion.map((sessionrecord) => {
                                return(
                                    <div className='tag_session_container'>
                                        <div className='parent_imgOfOneSession'>
                                            <img className='imgOfOneSession' src={sessionrecord.productImage}/>
                                        </div>
                                        <div className='multi_info'>
                                            <div className='disPlayFlex name_and_state'>
                                                <div className='disPlayFlex'>
                                                    <div className='text_lable_product'>Name:</div>
                                                    <div className='product_name number_product'>{sessionrecord.productName}</div>
                                                </div>
                                                <div className='witdh_full'>
                                                    <div className='product_state text_lable_product state_parent'>{GetNameState(sessionrecord.state)}</div>
                                                </div>
                                                </div>
                                            {/* <div className='disPlayFlex'>
                                                <div className='text_lable_product'>Paticipants Voted : </div>
                                                <div className=' number_product'>{sessionrecord.participantsVoted}</div>
                                            </div> */}
                                            <div className='disPlayFlex'>
                                                <div className='disPlayFlex'>
                                                    <div className='propose_price text_lable_product'>Propose Price: </div>
                                                    <div className='number_product'>{getFriceDiv(sessionrecord.proposePrice)}</div>
                                                </div>
                                                <div>
                                                    {
                                                        sessionrecord.state == 3 ? 
                                                        <div className = 'disPlayFlex text_lable_product'>
                                                            <div className ='final_price_text'>Final Price: </div>
                                                            <div className='number_product'>{getFriceDiv(sessionrecord.finalPrice)}</div>
                                                        </div> : <div></div>
                                                    }
                                                </div>
                                            </div>
                                            <div className='disPlayFlex descrtiption_container'>
                                                <div className='text_lable_product'>Description: </div>
                                                <div className='product_description text_lable_product'>{sessionrecord.productDescription}</div>
                                            </div>
                                            <div>
                                                {
                                                    GetButtonChangeState(sessionrecord)
                                                }
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            <Modal
            isOpen={modalChangeState}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            className='init_modal'
            contentLabel="Example Modal"
            >
                <div className='update_user_info_container'>
                    <div>
                        {
                            sessionChoose.state == 0 ?
                            <div className='update_user_title'>
                                Change State To Votting
                            </div> : 
                            <div>
                            {
                                sessionChoose.state == 1 ?
                                <div className='update_user_title'>
                                    Change State To Closing
                                </div> : 
                                <div className='update_user_title'>
                                    Closed Session
                                </div>

                            }
                            </div>
                        }
                    </div>
                    <div className='process_update'>
                        {
                            textAmount ==="pending" ? 
                            <div className='text_question text_pending'>Pending ...</div>
                            :
                            <div></div>
                        }
                    </div>
                    <div className='process_update'>
                        {
                            textAmount ==="error" ? 
                            <div className=''>
                                <div className='error_container'>
                                    <div className='text_question text_error'>Error!! </div>
                                </div>
                                <div className='text_error'>{txtError}</div>
                                <div className='button_after_tx'>
                                    <button className='buttonCancel' onClick={closeModal}>Close</button>
                                </div>
                            </div>:<div></div>
                        }
                    </div>
                    <div className='process_update'>
                        {
                            textAmount ==="success" ? 
                            <div>
                                <div className='success_container'>
                                    <div className='text_question text_success'>Success </div>
                                </div>
                                <div className=''>{txhash}</div>
                                <div className='button_after_tx'>
                                    <button className='buttonCancel' onClick={closeModal}>Close</button>
                                </div>
                            </div>
                            
                            :<div></div>
                        }
                    </div>
                    <div>
                        {
                            textAmount === "" ?
                            <div>
                                {
                                    sessionChoose.state == 2 ?
                                    <div className=''>
                                        <div className='udpate_final_price'>
                                            <div className='text_update_user final_p'>Final Price : </div>
                                            <input id="num_final_price" type="number" className='input_pricing' defaultValue={0} min="0" max="1000000"/>
                                        </div>
                                        <div className='button_container_update'>
                                                <button className='buttonUpdate' onClick={()=> {ChangeStateClosed(sessionChoose)}}>Update</button>
                                            <button className='buttonCancel' onClick={closeModal}>Close</button>
                                        </div>
                                    </div>:
                                    <div></div>
                                }
                            </div>:<div></div>
                        }
                    </div>
                </div>
            </Modal>
            <Modal
            isOpen={modalCreateSession}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            className='init_modal'
            contentLabel="Example Modal"
            >
                <div className='update_user_info_container'>
                    <div className='update_user_title'>
                        Create New Session
                    </div>
                    <div className='process_update'>
                        {
                            textAmount ==="pending" ? 
                            <div className='text_question text_pending'>Pending ...</div>
                            :
                            <div></div>
                        }
                    </div>
                    <div className='process_update'>
                        {
                            textAmount ==="error" ? 
                            <div className=''>
                                <div className='error_container'>
                                    <div className='text_question text_error'>Error!! </div>
                                </div>
                                <div className='text_error'>{txtError}</div>
                                <div className='button_after_tx'>
                                    <button className='buttonCancel' onClick={closeModal}>Close</button>
                                </div>
                            </div>:<div></div>
                        }
                    </div>
                    <div className='process_update'>
                        {
                            textAmount ==="success" ? 
                            <div>
                                <div className='success_container'>
                                    <div className='text_question text_success'>Success </div>
                                </div>
                                <div className=''>{txhash}</div>
                                <div className='button_after_tx'>
                                    <button className='buttonCancel' onClick={closeModal}>Close</button>
                                </div>
                            </div>
                            
                            :<div></div>
                        }
                    </div>
                </div>
            </Modal>

            
        </div>
    )
}

export default AdminSession;