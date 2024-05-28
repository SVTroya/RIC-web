'use client'

type Props = {
}

function Rules() {
  return (
    <>
      <h2 className='text-4xl font-medium text-gray-900 mb-4'>Rules</h2>
      <h3>GAME ROUNDS</h3>
      <p>
        At the beginning of each round, the Route dice are rolled once. The results of the
        roll will determine which Routes all players must draw that round. After the roll, all
        players play simultaneously, drawing the Routed rolled on their own boards.
        ROLLING DICE
        Take the Route dice and roll them in the middle of the table. Place the dice so that
        they are easily visible to all players.
        Hint: To more easily keep track of the Routes you have to draw, you can use the
        dice reference on your board to mark the available Routes, if you so desire.
        Note: Stations (squares) allow you to connect a Railway Route to a Highway
        Route. Overpasses allow the two to cross without being connected to each other.
      </p>

      <h3>DRAWING ROUTES</h3>
      <p>
        After the dice roll, all players must draw the Routes on their boards at the same
        time. There are a few drawing rules you need to follow:
        1. Each Route you draw must be connected on at least one side to either one of
        the exists, or a pre-existing Route, If you can’t connect a Route, you can’t draw
        it.
        2. You must draw all four Routes shown on the dice each round, if possible (and
        each Route showing can only be drawn once).
        3. You can’t draw Routes in a way that directly connects Railways to Highways
        (you need a Station to do that).
        Important: When drawing Routes, you can freely rotate and/or reverse the pattern
        you see on the die.
      </p>

      <h3>USING SPECIAL ROUTES (JUNCTIONS)</h3>
      <p>
        Each player can also use three of six Special Routes, displayed in the top part of
        the boards, that do not appear on the Route dice. These Routes may allow you to
        connect different Networks together and/or make bigger Networks.
        You may draw a Special Route once per round, in addition to the Routes shown
        on the Route dice, but you may use each Special Route only once per game. After
        you use a Special Route, you must mark it off on your board as a reminder that you
        can’t use it again. Also, you can only use up to three Special Routes during the
        entire game (and remember, only one per round).
      </p>

      <h3>SPECIAL BUILDINGS (CHALLENGE ONLY)</h3>
      <p>
        Some of the spaces of your board contain a Special Building (these are represented
        by the colored icons in the top left corner of some spaces). When you draw certain
        kinds of Routes in spaces containing a Special Building, you trigger special effects.
        These special effects must all be applied immediately or they are lost (you can’t
        draw on a space with a Special Building during the current round and apply its
        effects in a later round).
        There are 3 kinds of Special Buildings:
        ● Factory: You activate a Factory when you draw a Route with at least one
        Railway and/or one Highway stretch in its space. When you activate a Factory,
        you may “duplicate” one of the Route dice that were rolled this round, i.e.,
        draw it twice during the same round.
        ● Village: You activate a Village when you draw a Route with a Station in its
        space. When you activate a Village, mark the leftmost unmarked Village space in
        the scoring area of your board. At the end of the game, you will gain points
        equal to the value of the highest-value marked space.
        ● University: You activate a University when you draw a Route with at least
        one Railway and/or one Highway stretch in its space. When you activate a
        University, mark one of the University spaces in the scoring area of your board.
        When you mark your third and last University space, you may immediately draw
        one Special Route “for free,” i.e., it won’t count towards your limit of 1 per
        round and/or 3 per game. You must still mark this Special Route off your board
        (each single Special Route can still be used only once per game).
        Note: Drawing Routes obtained thanks to the effect of a Factory or a University
        on a space containing another Special Building does trigger the effect of the second
        Special Building: if you use them wisely, you can trigger chains of effects!
        Note: When playing with Expansions which may erase routes from your board, if
        a route is erased from a space containing a special Building, you don’t lose the
        effect obtained from its activation, and the Special Building can even be activated
        again by drawing another route in its space.
      </p>

      <h3>CHECKING GOALS (CHALLENGE ONLY)</h3>
      <p>
        Once all the players have drawn all of the available Routes, it’s time to check and
        declare if you achieved any Goals. This is the only way to score points during the
        game (the rest of the points are calculated only at the end of the game).
        At the end of each round, declare to the other players if you achieved a Goal and
        show your board to prove it. Then, write the highest score still available for that Goal
        in the corresponding score space on your board.
        If more than one player achieves the same Goal at the end of the same round,
        they all get the same number of points.
        Finally, mark the highest Score dot on the Goal card. Players who achieve that
        Goal in a later round will gain fewer points (the lowest score, worth 1 point, is never
        marked and will always be available).
        Note: Wait until the end of the round to declare which Goals you achieved. If you
        do it earlier, your opponents may be able to match you and get the same score!
      </p>

      <h3>END OF THE ROUND</h3>
      <p>
        Once all players have declared the Goals they achieved, if any, the round ends.
        Each player must mark the spaces where they drew Routes this round by writing
        the number of the current round in the white boxes of each space they drew on.
        Normally, you cannot erase the Routes you drew in a previous round. After that, roll
        the Route dice to start the next round.
      </p>

      <h3>END OF THE GAME</h3>
      <p>
        The game ends after the seventh round. Now it’s time to count your score! Each
        player counts the points they earned for their connected Exits, their Longest
        Railway and Longest Highway, and the Central Spaces they drew on, marking
        their points on the designated spaces of the Scoring Table on their boards.
        Then, each player must check for incomplete Routes. Each end of a Route that
        does not connect with any other Route or the outer edge of the board counts as an
        Error. Mark each one of these Errors with an X. You lose one point for each Error
        on your board. Mark these penalty points on the matching space of your Scoring
        Table.
        Note: If you are playing with an Expansion, mark any additional points on the
        Expansion space of your scoring board.
        Finally, add up all the points you earned, including those from the Villages you
        activated and the Goals you achieved during the game (and subtracting any points
        from Errors), then write your total score on your Scoring Table. The player with the
        most points wins! In case of a tie, the winner is the player with the fewest Error
        marks on their board. If they’re still tied, the victory is shared.
      </p>
    </>
  )
}

export default Rules