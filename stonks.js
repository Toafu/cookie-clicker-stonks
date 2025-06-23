// Returns overhead as a multiplier
const calculateOverhead = (numBrokers) => {
	return 1 + 0.01 * (20 * Math.pow(0.95, numBrokers));
};

const BUYBUYBUY = 20.00;
const stonkIDs = [...Array(18).keys()];
const game = Game.Objects['Bank'].minigame;
const brokers = game.brokers;
const overhead = calculateOverhead(brokers);
const stocks = Game.Objects['Bank'].minigame.goodsById;

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

			if (sellNow > lastBuy) {
				box.style.boxShadow = '0 0 10px 2px yellow';
			} else {
				box.style.boxShadow = '0 0 10px 2px red';
			}
		} else {
			box.style.boxShadow = '';
		}
	});
};

highlightLowPrices();
highlightProfits();