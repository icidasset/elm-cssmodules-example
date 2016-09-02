module CSSModules exposing (Flag, Model, Signature, decode, get, init)

{-| This library provides a way to use (PostCSS) CSS Modules with Elm.

A CSS-Modules dictionary is sent to Elm through a `Program` flag,
which has the following format:

    { "Main.component": "something" }

# Program
@docs init

# Lookup
@docs get

-}

import Dict exposing (Dict)
import Html exposing (Attribute)
import Html.Attributes exposing (class)
import Json.Decode exposing (Decoder, dict, string)


type alias Signature a = String -> Attribute a
type alias Dictionary = Dict String String
type alias Flag = Json.Decode.Value
type alias Model a = { a | cssmodules : Dictionary }


{-| The init function used with a `Program`.
Used like so:

    init : Maybe CSSModules.Flag -> (Model, Cmd Msg)
    init possibleFlag = CSSModules.init possibleFlag initialModelOfYourApp ! []

Where `initialModelOfYourApp` is a record that uses `CSSModules.Model`.

    initialModelOfYourApp : CSSModules.Model PrivateModel
    initialModelOfYourApp =
      { cssmodules = Dict.empty
      , somethingOfPrivateModel = ...
      }
-}
init : Maybe Flag -> Model a -> Model a
init odds model =
  case odds of
    Just flag -> { model | cssmodules = decode flag }
    Nothing   -> { model | cssmodules = Dict.empty }


{-| Decode the `CSSModules.Flag`.
-}
decode : Flag -> Dictionary
decode flag =
  Json.Decode.decodeValue (dict string) flag
  |> Result.withDefault Dict.empty


{-| Get a className for a given cssmodule.
If the cssmodule is not found, it returns an empty `class` attribute.

    let
      cssmoduleName = "Main.component"
    in
      div [ CSSModules.get model cssmoduleName ]

You can also use it like so:

    view model =
      let
        cssmodule = (CSSModules.get model)
      in
        div [ cssmodule "Main.component" ]
-}
get : Model a -> Signature b
get model moduleName =
  let
    className = Dict.get moduleName (model.cssmodules)
  in
    case className of
      Just cn -> class cn
      Nothing -> class ""
