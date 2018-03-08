module.exports = {
    toHump: str => str.replace(/-(\w)/g, 
	    x => x.slice(1).toUpperCase())  
}
