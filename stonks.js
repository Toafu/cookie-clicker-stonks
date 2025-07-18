// Returns overhead as a multiplier
const calculateOverhead = (numBrokers) => {
	return 1 + 0.01 * (20 * Math.pow(0.95, numBrokers));
};

// Highlight low prices to buy
const highlightLowPrices = () => {
	game.goodsById.forEach((s, i) => {
		const value = document.getElementById(`bankGood-${i}-val`);
		if (s.val < BUYBUYBUY) {
			value.style.color = 'springgreen';
		} else {
			value.style.color = '#fff';
		}
	});
};


// Highlight how much profit you currently have
// ASSUMES MAXING OUT BUYS AND SELLS
const highlightProfits = () => {
	stocks.forEach((s, i) => {
		const numShares = s.stock;
		const box = document.getElementById(`bankGood-${i}`);
		if (numShares > 0) {
			const lastBuy = numShares * s.prev * overhead;
			const sellNow = numShares * s.val;
			const profit = sellNow - lastBuy;

			if (sellNow > lastBuy) {
				box.style.boxShadow = `0 0 10px ${Math.max(1, profit / 10000)}px yellow`;
			} else {
				box.style.boxShadow = '0 0 10px 2px red';
			}
		} else {
			box.style.boxShadow = '';
		}
	});
};

const updateStonks = () => {
	highlightLowPrices();
	highlightProfits();
}

const BUYBUYBUY = 20.00;
const stonkIDs = [...Array(18).keys()];
const game = Game.Objects['Bank'].minigame;
const brokers = game.brokers;
const overhead = calculateOverhead(brokers);
const stocks = Game.Objects['Bank'].minigame.goodsById;

updateStonks();

const nextTick = document.getElementById("bankNextTick");
const observer = new MutationObserver(mutationList => {
	for (let mutation of mutationList) {
		if (mutation.type === 'childList') {
			const nextTickSplit = nextTick.innerHTML.split(" ");
			if (nextTickSplit.at(-2) === "1" && nextTickSplit.at(-1) === "minute.") {
				updateStonks();
			}
		}
	}
});
observer.observe(nextTick, { childList: true });

onfocus = (() => {
	updateStonks();
});
