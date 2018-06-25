module NotebookQL
extend Lexical;

import QL;

start syntax CommandForm
	 = vari: "form" Id name "=" Form form
	 | visualize: "visualize" "(" Id name")"
	 | tender: "html" "(" Id name")"
	 ;