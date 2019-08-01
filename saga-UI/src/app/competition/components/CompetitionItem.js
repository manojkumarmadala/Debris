import React from 'react';

export default function CompetitionItem(props) {
    
	let keys=Object.keys(props.item);
	return(
		<tr>
			{
				keys.map(value => {
					if(value==='source')
					{
						let src = props.item[value];
						if(src.length>0)
							return <td key={value}><a href={props.item[value]} target="_blank" rel="noopener noreferrer">Link</a></td>;

						else
							return <td key={value}></td>;
					}
					if(value!=='id')
						return <td key={value}>{props.item[value]}</td>;
					return null;
				})
			}
		</tr>
	);
}