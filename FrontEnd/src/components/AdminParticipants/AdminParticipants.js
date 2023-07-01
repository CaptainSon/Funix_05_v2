import React, { useState, useEffect } from 'react';
import './AdminParticipants.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const BigNumber = require('bignumber.js');
const { ethers } = require("ethers");
const provider = new ethers.providers.Web3Provider(window.ethereum);
const MainContractData = require('../../contracts/ContractInfo')

function AdminParticipants() {

    const mainContract = new ethers.Contract(MainContractData.address,MainContractData.abi, provider);
    const [user, setUser] = useState({})
    const navigate = useNavigate();
    const [listUser, setListUser] = useState([])
    const [textAmount, setTexAmount] = useState("");
    const [txtError, setTxtError] = useState("");
    const [account, setAccount] = useState("")
    const [txhash, setTxhash] = useState("");
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [deviationUser, setDevi] = useState()

    function afterOpenModal() {
    }

    function closeModal() {
        setTexAmount("");
        setIsOpen(false);
        fetchData();
    }

    function openModal() {
        setTexAmount("");
        setIsOpen(true);
    }

    window.ethereum.on('accountsChanged', function (accounts) {
        navigate("/")
    });

    const getAddress = (address) => {
        if(typeof address != "string") {
            return ""
        }
        const preAddress = address.slice(0,6) + "..." + address.slice(-5);
        return preAddress
    }

    const fetchData = async ()=> {
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = ethers.utils.getAddress(accounts[0]);
        const responseUser = await fetch(`http://localhost:3001/users`);
        const users = await responseUser.json()
        setListUser(users)
        setUser(users[0])
        const deviation = await users[0].deviation
        setDevi(parseFloat(deviation.toFixed(3)))
    }

    const changeUser = event => {
        for(let i = 0; i < listUser.length ; i++) {
            if(listUser[i].address == event.target.value) {
                setUser(listUser[i])
                const deviation = listUser[i].deviation
                setDevi(parseFloat(deviation.toFixed(3)))
            }

        }
    }

    const updateUserAdmin = async () => {
        setTexAmount("pending")
        const new_name = document.getElementById("input_new_name").value
        const new_email = document.getElementById("input_new_email").value
        const new_sessionjoin = parseInt(document.getElementById("input_new_sessionjoin").value)
        const new_deviation = parseFloat(document.getElementById("input_new_deviation").value)

        const decimals = new BigNumber('1000000000000000000');
        const big_deviation = new BigNumber(new_deviation * decimals);
        const signer =  provider.getSigner();
        const contractWithSig = mainContract.connect(signer);
        try {
            const udpate_user_admin_tx = await contractWithSig.updateInfomationByAdmin(user.address, new_name, new_email, new_sessionjoin, big_deviation.toString())
            const waitUpdate = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(udpate_user_admin_tx.hash);
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(udpate_user_admin_tx.hash)
                    clearInterval(waitUpdate);
                }
            },5000)
        } catch (error) {
            console.log(error)
            const err = error.toString();
            const err_detail = "Error detail : " + err.substring(7,32);
            setTexAmount("error");
            setTxtError(err_detail);
        }

    }

    const getDeviation = (value) => {
        const ans = parseFloat(value.toFixed(3))
        return ans
    }


    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div className='admin_participant_container'>
            <div className='admin_participant'>
                <div className='create-session-container udpate_user_admin'>
                    <div className='create_text'>User Information</div>
                    <div>
                        <div className='disPlayFlex'>
                            <div className='text_label_create'>FullName :</div>
                            <div className='text_data'>{user.fullName}</div>
                        </div>
                        <div className='disPlayFlex'>
                            <div className='text_label_create'>Email :</div>
                            <div className='text_data'>{user.email}</div>
                        </div>
                        <div className='disPlayFlex'>
                            <div className='text_label_create'>Address :</div>
                            <div className='text_data'>{getAddress(user.address)}</div>
                        </div>
                        <div className='disPlayFlex'>
                            <div className='text_label_create'>Session Joined :</div>
                            <div className='text_data'>{user.numberOfJoinedSession}</div>
                        </div>
                        <div className='disPlayFlex'>
                            <div className='text_label_create'>Deviation :</div>
                            <div className='text_data'>{deviationUser}</div>
                            <div className='phan_tram'>%</div>
                        </div>
                    </div>
                    <button className='button_update_user_info' onClick={openModal}>Update</button>
                </div>
                <div className='list_participant_container'>

                </div>
                <div className='list-session-container'>
                    <div className='list_session_title'>List User</div>
                    <select className='selectUser' onChange={changeUser}>
                        {
                            listUser.map( (userChoose) => {
                                return(
                                    <option className='userchosse' value={userChoose.address}>{userChoose.fullName}</option>
                                )
                            })
                        }
                    </select>
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
                        Update User Information
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
                                <div className='update_user'>
                                    <div className='update_name_and_email_container'>
                                        <div className='disPlayFlex group_input'>
                                            <div className='text_update_user'>Name: </div>
                                            <input id="input_new_name" className="name_user_update" type="text" defaultValue={user.fullName} />
                                        </div>
                                        <div className='disPlayFlex group_input'>
                                            <div className='text_update_user text_email_update'>Email: </div>
                                            <input id="input_new_email" className="name_user_update" type="text" defaultValue={user.email} />
                                        </div>
                                        <div className='disPlayFlex group_input'>
                                            <div className='text_update_user text_email_update'>Session Joined: </div>
                                            <input id="input_new_sessionjoin" className="name_sessionJoin_update" type="text" defaultValue={user.numberOfJoinedSession} />
                                        </div>
                                        <div className='disPlayFlex group_input'>
                                            <div className='text_update_user text_email_update'>Deviation: </div>
                                            <input id="input_new_deviation" className="name_user_update_deviation" type="text" defaultValue={deviationUser} />
                                        </div>
                                    </div>
                                </div>
                                <div className='button_container_update_paticipant'>
                                    <button className='buttonUpdate' onClick={updateUserAdmin}>Update</button>
                                    <button className='buttonCancel' onClick={closeModal}>Close</button>
                                </div>
                            </div>:<div></div>
                        }
                    </div>
                </div>
            </Modal>
            
        </div>
    )
}

export default AdminParticipants;