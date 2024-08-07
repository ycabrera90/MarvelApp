import "@testing-library/jest-dom"
import { render, screen, act } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "redux/app/store"
import { sendMessage } from "redux/reducers/ui.actions"
import { MSSG } from "global/messages"
import InfoBar from "./InfoBar"

const InfoBarFactory = async () => {
	render(
		<Provider store={store}>
			<InfoBar />
		</Provider>
	)
}

describe("InfoBar Component", () => {
	it("If there are no messages in the state ({ text: null, type: null }) the component should not to be in the DOM", async () => {
		await InfoBarFactory()
		const infoBar = screen.queryByTestId("InfoBar")
		expect(infoBar).not.toBeInTheDocument()
	})

	it("the bar should have the correct text of the message field ", async () => {
		await InfoBarFactory()
		act(() => store.dispatch(sendMessage(MSSG.ALERT)))
		const infoBarMessage = screen.queryByText(MSSG.ALERT.text)
		expect(infoBarMessage).toBeInTheDocument()
	})

	it("the bar should have the correct class base on the type of the message field ", async () => {
		await InfoBarFactory()
		act(() => store.dispatch(sendMessage(MSSG.ALERT)))
		const infoBar = screen.queryByTestId("InfoBar")
		expect(infoBar).toHaveClass(MSSG.ALERT.type)
	})
})
