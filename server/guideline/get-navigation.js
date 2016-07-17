import docs from './get-all-docs'
import list from './get-all-pages'

export default [
	{
		section :'Docs',
		icon    :'fa-file-text-o',
		items   :docs
	},
	{
		section :'Guideline',
		icon    :'fa-book',
		items   :list('guideline')
	},
	{
		section :'Pages',
		icon    :'fa-files-o',
		items   :list('pages', true)
	}
]
