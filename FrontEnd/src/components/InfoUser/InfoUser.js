import React, { useState, useEffect } from 'react';
import './InfoUser.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const { ethers } = require("ethers");
const MainContractData = require('../../contracts/ContractInfo')
const provider = new ethers.providers.Web3Provider(window.ethereum);

function InfoUser() {
    const mainContract = new ethers.Contract(MainContractData.address,MainContractData.abi, provider);

    const [modalIsOpen, setOpenModal] = React.useState(false);
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [textAmount, setTexAmount] = useState("");
    const [txtError, setTxtError] = useState("");
    const [txhash, setTxhash] = useState("");
    const navigate = useNavigate(); 

    window.ethereum.on('accountsChanged',async function (accounts) { 
        navigate("/")
    });

    function afterOpenModal() {
    }

    function closeModal() {
        if(textAmount ===  "success") {
            setTexAmount("");
            navigate("/home")
            setOpenModal(false);
            return 
        }
        setTexAmount("");
        setOpenModal(false);
    }

    function preRegisterUser() {
        const username = document.getElementById("user_name_register").value
        const useremail = document.getElementById("user_email_register").value
        console.log("username" + username)
        console.log("useremail" + useremail)
        setUserName(username)
        setUserEmail(useremail)
        setOpenModal("")
        setOpenModal(true)
    }

    const RegisterUser = async ()=> {
        const signer =  provider.getSigner();
        const contractWithSig = mainContract.connect(signer);

        try {
            setTexAmount("pending");
            const register_user_tx = await contractWithSig.register(userName,userEmail)
            const waitUpdate = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(register_user_tx.hash);
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(register_user_tx.hash)
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

    return(
        <div className='container_info_user'>
            <div className="container_info">
                <div className=''>
                    <div className="text-WellCome">
                        WellCome!
                    </div>
                    <div className='container-input'>
                        <div className='text-info'>User Name</div>
                        <input type="text" id="user_name_register" className='box-input' placeholder="Yourname.."/>

                        <div className='text-info'>Email</div>
                        <input type="text" id="user_email_register" className='box-input' placeholder="Email.."/>
                    </div>
                </div>
                <div className='container-submit'>
                    <button className='button' onClick={preRegisterUser}>Submit</button>
                </div>
            </div>
            <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            className='init_modal'
            contentLabel="Example Modal"
            >
                <div className='update_user_info_container'>
                    <div className='update_user_title'>
                        Register User
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
                            <div className='register_user_modal_container'>
                                <div className='questtion_register_user'>
                                    Are you sure register Pricing Chain with 
                                </div>
                                <div className='register_user_info_container'>
                                    <div>
                                        <div className='disPlayFlex'>
                                            <div className='title_name_register'>Name: </div>
                                            <div className='text_username_register'>{userName}</div>
                                        </div>
                                        <div className='disPlayFlex'>
                                            <div className='title_name_register'>Email: </div>
                                            <div className='text_username_register'>{userEmail}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='button_container_update'>
                                    <button className='buttonUpdate' onClick={RegisterUser}>Yes</button>
                                    <button className='buttonCancel' onClick={closeModal}>No</button>
                                </div>
                            </div>:<div></div>
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default InfoUser;