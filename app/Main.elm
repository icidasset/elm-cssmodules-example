import CSSModules
import Dict exposing (Dict)
import Html exposing (..)
import Html.App as App
import Html.Attributes exposing (..)
import Json.Decode exposing (Decoder, dict, string)


main : Program (Maybe CSSModules.Flag)
main =
  App.programWithFlags
    { init = init
    , view = view
    , update = update
    , subscriptions = \_ -> Sub.none
    }


init : Maybe CSSModules.Flag -> (Model, Cmd Msg)
init odds = CSSModules.init odds initialModel ! []



-- MODEL


type alias Model = CSSModules.Model PrivateModel
type alias PrivateModel =
  { somethingElse : Bool
  }

initialModel : Model
initialModel =
  { somethingElse = True
  , cssmodules = Dict.empty
  }



-- UPDATE


type Msg = TODO

update : Msg -> Model -> (Model, Cmd Msg)
update msg model = model ! []



-- VIEW


view : Model -> Html Msg
view model =
  let
    cssmodule = (CSSModules.get model)
  in
    div
      [ cssmodule "Main.component" ]
      [
        div
          [ cssmodule "Wrapper.component" ]
          [ text "Example" ]
      ]
