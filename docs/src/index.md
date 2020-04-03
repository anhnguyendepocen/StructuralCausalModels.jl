# StructuralCausalModels

*Documentation goes here.*

```@meta
CurrentModule = StructuralCausalModels
```

## `scm_path`
```@docs
scm_path(parts...)
```

## `DAG`
```@docs
DAG
DAG(d::OrderedDict{Symbol, Vector{Symbol}}) 
```

## `d_separation`
```@docs
d_separation(d::DAG, first::Vector{Symbol}, second::Vector{Symbol}, cond::SymbolList=nothing) 
```

##`basis_set`
```@docs
StructuralCausalModels.basis_set(dag::DAG)
```

##`shipley_test`
```@docs
shipley_test(d::DAG)
```

##`pcor`
```@docs
StructuralCausalModels.pcor(u::Vector{Symbol}, S::NamedArray)
```