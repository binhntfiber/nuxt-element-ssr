export const useModals = () => {
  const isShowModalListToken = useState('isShowModalListToken', () => false)
  const isShowLogoutModal = useState('isShowLogoutModal', () => false)
  const isShowModalWaitingConfirmTx = useState('isShowModalWaitingConfirmTx', () => false)
  const isShowModalTxSubmitted = useState('isShowModalTxSubmitted', () => false)
  const isShowModalTxRejected = useState('isShowModalTxRejected', () => false)
  const waitingModalContent = useState('waitingModalContent', () => '')
  const submittedTxHash = useState('submittedTxHash', () => '')
  const setModalListTokenState = (val: boolean) => {
    isShowModalListToken.value = val
  }
  const setLogoutModalState = (val: boolean) => {
    isShowLogoutModal.value = val
  }
  const setModalWaitingTxState = (val: boolean, content?: string) => {
    isShowModalWaitingConfirmTx.value = val
    waitingModalContent.value = content || ''
  }
  const setModalTxSubmitted = (val: boolean, txHash?: string) => {
    isShowModalTxSubmitted.value = val
    submittedTxHash.value = txHash || ''
  }

  const setModalTxRejected = (val: boolean) => {
    isShowModalTxRejected.value = val
  }
  return {
    setModalListTokenState,
    setLogoutModalState,
    setModalWaitingTxState,
    setModalTxSubmitted,
    setModalTxRejected,
    isShowModalListToken,
    isShowLogoutModal,
    isShowModalTxSubmitted,
    isShowModalWaitingConfirmTx,
    waitingModalContent,
    submittedTxHash,
    isShowModalTxRejected,
  }
}
