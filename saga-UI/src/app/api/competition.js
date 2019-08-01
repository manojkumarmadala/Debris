import data from '../data/sampleData.json';
import newsData from '../data/sampleNews.json';

export function getCompetitionData(){
	return new Promise(function(resolve){
		return setTimeout(() => resolve(data), 100);
	});
}

export function getNewsData(){
	return new Promise(function(resolve){
		return setTimeout(() => resolve(newsData), 100);
	});
}