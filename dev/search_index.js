var documenterSearchIndex = {"docs":
[{"location":"introduction/#Introduction-1","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"CurrentModule = StructuralCausalModels","category":"page"},{"location":"#scm_path-(exported)-1","page":"StructuralCausalModels API","title":"scm_path (exported)","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"scm_path(parts...)","category":"page"},{"location":"#StructuralCausalModels.scm_path-Tuple","page":"StructuralCausalModels API","title":"StructuralCausalModels.scm_path","text":"scm_path\n\nRelative path using the StatisticalRethinking src/ directory. Copied from DynamicHMCExamples.jl\n\nExample to get access to the data subdirectory\n\nscm_path(\"..\", \"data\")\n\n\n\n\n\n","category":"method"},{"location":"#DAG-struct-(exported)-1","page":"StructuralCausalModels API","title":"DAG struct (exported)","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"DAG","category":"page"},{"location":"#StructuralCausalModels.DAG","page":"StructuralCausalModels API","title":"StructuralCausalModels.DAG","text":"DAG\n\nDirected acyclic graph struct\n\nStruct\n\nDAG(\n* `name::AbstractString`                    : Variables used to compute correlation\n* `d::OrderedDict{Symbol, Vector{Symbol}}`  : DAG definition aas a Dict\n* `a::NamedArray`                           : Adjacency matrix\n* `e::NamedArray`                           : Edge matric\n* `s::NamedArray`                           : Covariance matrix\n* `df::DataFrame`                           : Variable observations\n* `vars::Vector{Symbol}`                    : Names of variables\n)\n\nPart of API, exported.\n\n\n\n\n\n","category":"type"},{"location":"#DAG-constructor-(exported)-1","page":"StructuralCausalModels API","title":"DAG constructor (exported)","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"DAG(name::AbstractString, d::OrderedDict{Symbol, Vector{Symbol}}, df::DataFrame)","category":"page"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"\n## d_separation (exported)","category":"page"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"@docs d_separation(d::DAG, first::Vector{Symbol}, second::Vector{Symbol}, cond::SymbolList=nothing)","category":"page"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"\n## shipley_test (exported)","category":"page"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"@docs shipley_test(d::DAG)","category":"page"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"\n## basis_set (not exported)","category":"page"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"@docs basis_set(dag::DAG)","category":"page"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"\n## pcor (not exported)","category":"page"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"@docs pcor(u::Vector{Symbol}, S::NamedArray)","category":"page"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"\n# Internals","category":"page"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"@docs dagvars(d::OrderedDict{Symbol, Vector{Symbol}}) edgematrix(d::OrderedDict{Symbol, Vector{Symbol}}) edgematrix(a::NamedArray, inv=false) adjacencymatrix(d::OrderedDict{Symbol, Vector{Symbol}}) adjacencymatrix(e::NamedArray) topologicalorder(a::NamedArray) topologicalsort(a::NamedArray) ancestergraph(e::NamedArray) indicatormatrix(e::NamedArray) transitiveclosure(a::NamedArray) inducedcovariancegraph(d::DAG, sel::Vector{Symbol}, cond::SymbolList; debug=false) ```","category":"page"},{"location":"scm/#Structural-Causal-Models-1","page":"Walkthrough","title":"Structural Causal Models","text":"","category":"section"}]
}