import Dict exposing (Dict)
import Html exposing (..)
import Html.App as App
import Html.Attributes exposing (..)


main : Program (Maybe CSSModulesFlag)
main =
  App.programWithFlags
    { init = init
    , view = view
    , update = update
    , subscriptions = \_ -> Sub.none
    }


type alias CSSModulesFlag = List (String, String)
type alias CSSModules = Dict String String


init : Maybe CSSModulesFlag -> (Model, Cmd Msg)
init args =
  case args of
    Just cm -> { emptyModel | cssmodules = Dict.fromList(cm) } ! []
    Nothing -> emptyModel ! []



-- MODEL


-- The full application state of our app
type alias Model =
  { cssmodules : CSSModules }

emptyModel =
  { cssmodules = Dict.empty }



-- UPDATE


-- These are the actions the user can perform
type Msg = TODO

update : Msg -> Model -> (Model, Cmd Msg)
update msg model = model ! []



-- VIEW


view : Model -> Html Msg
view model = baseView model (\className -> applyCSSModule className model)


baseView : Model -> (String -> Attribute Msg) -> Html Msg
baseView model cssmodule =
  div
    [ cssmodule "Main.component" ]
    [
      div
        [ cssmodule "Wrapper.component" ]
        [ text "Example" ]
    ]



-- UTILS


applyCSSModule : String -> Model -> Attribute Msg
applyCSSModule modName model =
  let
    className = Dict.get modName (model.cssmodules)
  in
    case className of
      Just cn -> class cn
      Nothing -> class ""
